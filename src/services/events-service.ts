import m from "mithril";
import { IEvent } from "../models";
import { ChannelNames } from "../models/channels";
import { RestService } from "./rest-service";

class EventsService extends RestService<Partial<IEvent>> {
  constructor() {
    super("events", ChannelNames.LESSON);
    this.loadList();
  }

  public async loadList(): Promise<Array<Partial<IEvent>> | undefined> {
    const filter =
      "view?props=$loki,name,desc,memberCountries,cmFunctions,initialIncident,otherIncidents,eventType,lessons,owner,published,canEdit";
    // http://localhost:3000/events/view?props=name,cmFunctions,incidentType,eventType
    const result = await m
      .request<IEvent[]>({
        method: "GET",
        url: this.baseUrl + filter,
        withCredentials: this.withCredentials,
      })
      .catch((e) => console.warn(e));
    this.setList(result || []);
    return this.list;
  }
}

export const EventsSvc = new EventsService();
