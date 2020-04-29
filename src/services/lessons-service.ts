import m from 'mithril';
import { ILesson } from '../models';
import { ChannelNames } from '../models/channels';
import { RestService } from './rest-service';

class LessonsService extends RestService<Partial<ILesson>> {
  constructor() {
    super('lessons', ChannelNames.LESSON);
    this.loadList();
  }

  public async loadList(): Promise<Array<Partial<ILesson>> | undefined> {
    const filter =
      'view?props=$loki,title,solution,memberCountries,societalSectors,crossCutting,response,owner,published,canEdit';
    // http://localhost:3300/lessons/view?props=title,description,memberCountries,societalSectors,cmFunctionPrimary,operations,owner,published,canEdit
    const result = await m
      .request<ILesson[]>({
        method: 'GET',
        url: this.baseUrl + filter,
        withCredentials: this.withCredentials,
      })
      .catch((e) => console.warn(e));
    this.setList(result || []);
    return this.list;
  }
}

export const LessonsSvc = new LessonsService();
