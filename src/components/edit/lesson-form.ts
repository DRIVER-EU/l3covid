import M from 'materialize-css';
import m from 'mithril';
import { Button, Chips, ModalPanel } from 'mithril-materialized';
import { deepCopy, LayoutForm } from 'mithril-ui-form';
import { ILesson } from '../../models';
import { LessonsSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { llf } from '../../template/llf';
import { capitalizeFirstLetter } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

const EDITOR_KEY = 'editor';

const log = console.log;

const close = async (e?: UIEvent) => {
  log('closing...');
  dashboardSvc.switchTo(Dashboards.SEARCH);
  if (e) {
    e.preventDefault();
  }
};

export const LessonForm = () => {
  const state = {
    // hasChanged: false,
    lesson: {} as Partial<ILesson>,
    loaded: false,
    isValid: false,
    form: llf,
    error: '',
    /** Relevant context for the Form, can be used with show/disabling */
    context: {
      admin: true,
    },
  };

  const onsubmit = async () => {
    // state.hasChanged = false;
    log('submitting...');
    if (state.lesson) {
      const { lesson } = state;
      saveEditorInfoToLocalStorage(lesson);
      // const event = deepCopy(state.event);
      await LessonsSvc.save(lesson);
      state.lesson = LessonsSvc.getCurrent();
    }
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const lesson = await LessonsSvc.load(m.route.param('id')).catch((r) => reject(r));
        getEditorInfoFromLocalStorage(lesson);
        state.lesson = lesson ? deepCopy(lesson) : ({} as ILesson);
        state.loaded = true;
        m.redraw();
        resolve();
      });
    },

    view: () => {
      const { lesson, form, context, loaded } = state;
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      // log(event);
      const sections = form
        .filter((c) => c.type === 'section')
        .map((c) => ({
          style: 'cursor: pointer;',
          id: c.id,
          title: c.label || capitalizeFirstLetter(c.id),
        }));
      const section = m.route.param('section') || sections[0].id;
      return m('.row', [
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
              m('h4.primary-text', { style: 'margin-left: 20px;' }, 'Content'),
              ...sections.map((s) =>
                m(
                  'li',
                  m(
                    m.route.Link,
                    { href: dashboardSvc.route(Dashboards.EDIT).replace(':id', `${lesson.$loki}?section=${s.id}`) },
                    m('span.primary-text', s.title)
                  )
                )
              ),
              m('.buttons', [
                m(Button, {
                  label: 'Show lesson',
                  iconName: 'visibility',
                  className: 'right col s12',
                  onclick: () => dashboardSvc.switchTo(Dashboards.READ, { id: lesson.$loki }),
                }),
                // m(Button, {
                //   label: 'Save event',
                //   iconName: 'save',
                //   class: `green col s12 ${hasChanged ? '' : 'disabled'}`,
                //   onclick: onsubmit,
                // }),
                m(Button, {
                  modalId: 'delete-lesson',
                  label: 'Delete lesson',
                  iconName: 'delete',
                  class: 'red col s12',
                }),
              ]),
              Auth.isOwner(lesson)
                ? m(
                    'li',
                    m(
                      '.col.s12',
                      m(Chips, {
                        label: 'Owner(s)',
                        placeholder: '+username',
                        onchange: async (chips) => {
                          lesson.owner = chips.map(({ tag }) => tag);
                          if (lesson.owner.length === 0) {
                            M.toast({ html: 'Owner(s) cannot be empty!', classes: 'red' });
                            lesson.owner.push(Auth.username);
                          }
                          await onsubmit();
                        },
                        data: lesson.owner
                          ? lesson.owner instanceof Array
                            ? lesson.owner.map((owner) => ({ tag: owner }))
                            : [{ tag: lesson.owner }]
                          : [],
                      })
                    )
                  )
                : undefined,
              Auth.canCRUD(lesson)
                ? m(
                    'li',
                    m(
                      '.col.s12',
                      m(Chips, {
                        label: 'Rights to edit are provided to:',
                        placeholder: '+username',
                        onchange: (chips) => {
                          lesson.canEdit = chips.map(({ tag }) => tag);
                          m.redraw();
                        },
                        data: (lesson.canEdit || []).map((editor) => ({ tag: editor })),
                      })
                    )
                  )
                : undefined,
            ]
          )
        ),
        m('.col.s12.l9', [
          m(LayoutForm, {
            key: section,
            form,
            obj: lesson,
            onchange: async () => {
              // console.log(JSON.stringify(event.cmFunctions, null, 2));
              // console.log(JSON.stringify(event.memberCountries, null, 2));
              // state.event = event;
              // state.hasChanged = true;
              await onsubmit();
            },
            context,
            section,
          }),
        ]),
        m(ModalPanel, {
          id: 'delete-lesson',
          title: 'Delete lesson',
          description: 'Do you really want to delete this lesson - there is no way back?',
          options: { opacity: 0.7 },
          buttons: [
            {
              label: 'Delete',
              onclick: async () => {
                LessonsSvc.delete(lesson.$loki);
                close();
              },
            },
            {
              label: 'Discard',
            },
          ],
        }),
      ]);
    },
  };
};
function getEditorInfoFromLocalStorage(lesson: void | Partial<ILesson> | undefined) {
  if (lesson && Auth.isOwner(lesson)) {
    const editor = window.localStorage.getItem(EDITOR_KEY);
    const { name = '', organisation = '', organisationType = '', country = '' } = editor ? JSON.parse(editor) : {};
    lesson.name = lesson.name || name;
    lesson.organisation = lesson.organisation || organisation;
    lesson.organisationType = lesson.organisationType || organisationType;
    lesson.country = lesson.country || country;
  }
}

function saveEditorInfoToLocalStorage(lesson: Partial<ILesson>) {
  if (Auth.isOwner(lesson)) {
    const editor = {
      name: lesson.name,
      organisation: lesson.organisation,
      organisationType: lesson.organisationType,
      country: lesson.country,
    };
    window.localStorage.setItem(EDITOR_KEY, JSON.stringify(editor));
  }
}
