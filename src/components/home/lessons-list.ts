import m from 'mithril';
import { FlatButton, Icon, Select, TextInput } from 'mithril-materialized';
import { ILesson } from '../../models';
import { AppState } from '../../models/app-state';
import { Roles } from '../../models/roles';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { LessonsSvc } from '../../services/lessons-service';
import { Auth } from '../../services/login-service';
import { cmFunctions, countries, societalSectors, cmOperations } from '../../template/llf';
import { titleAndSolutionFilter, typeFilter } from '../../utils';

export const LessonsList = () => {
  const state = {
    filterValue: '',
    countryFilter: [],
    societalSectorFilter: [],
    operationsFilter: [],
    cmFunctionFilter: [],
  } as {
    countryFilter: Array<string | number>;
    societalSectorFilter: Array<string | number>;
    operationsFilter: string[];
    cmFunctionFilter: Array<string | number>;
    filterValue: string;
  };

  const sortByName: ((a: Partial<ILesson>, b: Partial<ILesson>) => number) | undefined = (a, b) =>
    (a.name || '') > (b.name || '') ? 1 : (a.name || '') < (b.name || '') ? -1 : 0;

  const pageSize = 24;

  return {
    oninit: () => LessonsSvc.loadList(),
    view: () => {
      const { countryFilter, societalSectorFilter, cmFunctionFilter, operationsFilter } = state;
      const lessons = (LessonsSvc.getList() || ([] as ILesson[])).sort(sortByName);
      const query = titleAndSolutionFilter(state.filterValue);
      const page = m.route.param('page') ? +m.route.param('page') : 0;
      const filteredLessons =
        lessons
          .filter(
            (lesson) =>
              lesson.published ||
              (Auth.isAuthenticated && (Auth.roles.indexOf(Roles.ADMIN) >= 0 || Auth.canEdit(lesson)))
          )
          .filter(query)
          .filter(typeFilter('memberCountries', countryFilter))
          .filter(typeFilter('societalSectors', societalSectorFilter))
          .filter(typeFilter('crossCutting', operationsFilter))
          .filter(typeFilter('response', cmFunctionFilter))
          .slice(page * pageSize, (page + 1) * pageSize) || [];
      return m('.row', { style: 'margin-top: 1em;' }, [
        m(
          '.col.s12.l3',
          m(
            'ul#slide-out.sidenav.sidenav-fixed',
            {
              style: 'height: 95vh',
              oncreate: ({ dom }) => {
                M.Sidenav.init(dom);
              },
            },
            [
              Auth.isAuthenticated &&
                m(FlatButton, {
                  label: 'Add new lesson',
                  iconName: 'add',
                  class: 'col s11 indigo darken-4 white-text',
                  style: 'margin: 1em;',
                  onclick: async () => {
                    const ev = await LessonsSvc.create({
                      title: 'New lesson',
                      owner: [Auth.username],
                      published: false,
                    });
                    if (ev) {
                      dashboardSvc.switchTo(Dashboards.EDIT, { id: ev.$loki });
                    }
                  },
                }),
              m('h4.primary-text', { style: 'margin-left: 0.5em;' }, 'Filter lessons'),
              m(TextInput, {
                label: 'Text filter of lessons',
                id: 'filter',
                placeholder: 'Part of title or description...',
                iconName: 'filter_list',
                onkeyup: (_: KeyboardEvent, v?: string) => (state.filterValue = v ? v : ''),
                style: 'margin-right:100px',
                className: 'col s12',
              }),
              m(Select, {
                placeholder: 'Select one',
                label: 'Country',
                checkedId: countryFilter,
                options: countries,
                iconName: 'language',
                multiple: true,
                onchange: (f) => (state.countryFilter = f),
                className: 'col s12',
              }),
              m(Select, {
                placeholder: 'Select one',
                label: 'Societal sector',
                checkedId: societalSectorFilter,
                options: societalSectors,
                iconName: 'people',
                multiple: true,
                onchange: (f) => (state.societalSectorFilter = f),
                className: 'col s12',
              }),
              m(Select, {
                placeholder: 'Select one',
                label: 'Operations',
                checkedId: operationsFilter,
                options: cmOperations,
                iconName: 'swap_calls',
                multiple: true,
                onchange: (f) => (state.operationsFilter = f as string[]),
                className: 'col s12',
              }),
              m(Select, {
                placeholder: 'Select one',
                label: 'CM function',
                checkedId: cmFunctionFilter,
                options: cmFunctions,
                iconName: 'notifications_active',
                multiple: true,
                onchange: (f) => (state.cmFunctionFilter = f),
                className: 'col s12',
                dropdownOptions: { container: 'body' as any },
              }),
              m(FlatButton, {
                label: 'Clear all filters',
                iconName: 'clear_all',
                class: 'col s11',
                style: 'margin: 1em;',
                onclick: () => {
                  state.filterValue = '';
                  state.countryFilter.length = 0;
                  state.cmFunctionFilter.length = 0;
                  state.societalSectorFilter.length = 0;
                  state.operationsFilter.length = 0;
                },
              }),
            ]
          )
        ),
        m(
          '.col.s12.l9',
          filteredLessons.map((lesson) =>
            m('.col.s12.m6.xl4', [
              m(
                '.card.hoverable',
                m('.card-content', { style: 'height: 150px;' }, [
                  m(
                    m.route.Link,
                    {
                      className: 'card-title',
                      href: dashboardSvc.route(Dashboards.READ).replace(':id', `${lesson.$loki}`),
                    },
                    lesson.title || 'Untitled'
                  ),
                  m('p.light.block-with-text', lesson.description),
                  // m('pre', JSON.stringify(lesson, null, 2)),
                ]),
                m('.card-action', [
                  m(
                    'a',
                    {
                      target: '_blank',
                      href: `${AppState.apiService}/api/events/${lesson.$loki}`,
                    },
                    m(Icon, {
                      className: 'white-text',
                      iconName: 'cloud_download',
                    })
                  ),
                  m('span.badge', `${daysAgo(lesson) <= 1 ? '1 day ago' : `${daysAgo(lesson)} days ago`}`),
                ])
              ),
            ])
          )
        ),
      ]);
    },
  };
};

const daysAgo = (lesson: Partial<ILesson>) => (lesson.date ? (Date.now() - lesson.date) / (24 * 3600000) : 0);
