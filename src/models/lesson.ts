import { IOrganisation } from './organisation';

export interface ILokiObj {
  $loki: number;
  meta: {
    created: number; // Date().getTime()
    revision: number;
    updated: number; // Date().getTime()
    version: number;
  };
}

export interface ILesson extends ILokiObj {
  /** Owner of the document */
  owner: string[];
  /** If true, the document is published */
  published: boolean;
  /** List of emails of the persons who can edit this document */
  canEdit: string[];
  /** Name of the editor */
  name: string;
  /** Name of the editor's organisation */
  organisation: string;
  /** Type of the editor's organisation */
  organisationType: string;
  /** Country of the editor's organisation */
  country: string;

  /** Title of the lesson */
  title: string;
  /** Description of the problem */
  problem: string;
  /** Description of the lesson */
  description: string;
  /** Time the lesson was created */
  date: number;
  /** Location of the lesson */
  location: string;
  /** Member countries that were involved */
  memberCountries: string[];
  /** Scale of the problem */
  scale: string;
  /** Societal sectors */
  societalSectors: string[];
  /** Primary CM function */
  cmFunctionPrimary: string;
  /** Enabling operations */
  operations: string[];
  /** Preparatory */
  preparatory: string[];
  recovery: string[];
  /** Positive effects of the solution */
  positive: string;
  /** Negative effects of the solution */
  negative: string;
  publications: IPublication[];
  multimedia: IMultimedia[];
}

export interface IPublication {
  title: string;
  orgTitle?: string;
  author?: string;
  yearOfPublication?: number;
  url?: string;
  language?: string;
  dissemination?: string;
  otherLanguage?: string;
}

export interface IMultimedia {
  desc?: string;
  owner?: string;
  url?: string;
  yearOfPublication?: string;
}
