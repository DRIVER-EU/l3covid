import m, { FactoryComponent } from 'mithril';
import { FlatButton, InputCheckbox } from 'mithril-materialized';
import { deepCopy, labelResolver } from 'mithril-ui-form';
import { ILesson } from '../../models';
import { LessonsSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { FormattedLesson } from '../../services/format-lesson';
import { Auth } from '../../services/login-service';
import { llf } from '../../template/llf';
import { CircularSpinner } from '../ui/preloader';

export const EventView: FactoryComponent = () => {
  const state = {
    lesson: {} as Partial<ILesson>,
    loaded: false,
    resolveObj: labelResolver(llf),
  };
  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const lesson = await LessonsSvc.load(m.route.param('id')).catch((r) => reject(r));
        state.lesson = lesson ? deepCopy(lesson) : ({} as ILesson);
        state.loaded = true;
        resolve();
      });
    },
    view: () => {
      const { lesson, loaded, resolveObj } = state;
      // console.log(JSON.stringify(event, null, 2));
      const resolved = resolveObj<ILesson>(lesson);
      // console.log(JSON.stringify(resolved, null, 2));
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      if (!resolved) {
        return undefined;
      }
      return [
        Auth.canEdit(lesson)
          ? m('ul.do-not-print', [
              m(
                'li',
                m(FlatButton, {
                  label: 'EDIT LESSON',
                  iconName: 'edit',
                  className: 'right hide-on-small-only',
                  onclick: () => dashboardSvc.switchTo(Dashboards.EDIT, { id: lesson.$loki }),
                })
              ),
              m(
                'li',
                m(InputCheckbox, {
                  className: 'left margin-top7',
                  checked: lesson.published,
                  onchange: async (checked) => {
                    lesson.published = checked;
                    await LessonsSvc.save(lesson);
                  },
                  label: 'PUBLISH LESSON',
                })
              ),
            ])
          : undefined,
        m(FormattedLesson, { event: resolved }),
      ];
    },
  };
};
