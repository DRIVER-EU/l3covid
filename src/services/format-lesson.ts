import m, { Attributes, FactoryComponent } from 'mithril';
import { SlimdownView } from 'mithril-ui-form';
import { ILesson, IMultimedia, IPublication } from '../models';
import { formatOptional } from '../utils';

/** Print optional */
const p = (val: string | number | Date | string[] | undefined, output?: string) => (val ? output || val : '');

/** Print a list: a, b and c */
const l = (val: undefined | string | string[], and = 'and') => {
  if (!val) {
    return '';
  }
  if (val instanceof Array) {
    if (val.length === 1) {
      return val[0];
    }
    const [last, oneButLast, ...items] = val.filter(Boolean).reverse();
    return [...items, `${oneButLast} ${and} ${last}`].join(', ');
  } else {
    return val;
  }
};

const showEditors = (event: Partial<ILesson>) => {
  const { name, organisation, organisationType, country } = event;
  return name
    ? `<p class="center-align"><i>by ${name}${formatOptional(
        { brackets: true },
        organisation,
        organisationType,
        country
      )}</i></p>`
    : '';
};

const formatUrl = (url?: string) => (url ? `[${url}](${url})` : '');

const showSources = (event: Partial<ILesson>) => {
  const { publications, multimedia } = event;

  const formatPublication = (pub: IPublication) =>
    `${pub.title}${
      pub.yearOfPublication
        ? ` (${pub.yearOfPublication}${pub.dissemination ? `, ${pub.dissemination}` : ''})`
        : `${pub.dissemination ? `, ${pub.dissemination}` : ''}`
    }${pub.author ? `, ${pub.author}` : ''}${pub.url ? `, ${formatUrl(pub.url)}` : ''}${formatOptional(
      { brackets: true, prepend: 'original title: ' },
      pub.orgTitle,
      /other/i.test(pub.language || '') ? pub.otherLanguage : pub.language
    )}`;

  const formatMultimedia = (mm: IMultimedia) =>
    `${formatUrl(mm.url)}${mm.yearOfPublication ? ` (${mm.yearOfPublication})` : ''}${mm.desc ? `, ${mm.desc}` : ''}${
      mm.owner ? ` (owned by ${mm.owner})` : ''
    }`;

  const ps = publications
    ? publications
        .filter(Boolean)
        .map((pub, i) => `${i + 1}. ${formatPublication(pub)}`)
        .join('\n')
    : '';
  const ms = multimedia
    ? multimedia
        .filter(Boolean)
        .map((mm, i) => `${i + 1}. ${formatMultimedia(mm)}`)
        .join('\n')
    : '';

  // console.log(ps);

  return (
    (ps
      ? `<h5 class="primary-text">Publications</h5>
${ps}`
      : '') +
    (ms
      ? `<h5 class="primary-text">Multimedia sources</h5>
${ms})`
      : '')
  );
};

/**
 * Format a lesson object to a markdown layout.
 */
const formatLesson = (lesson: ILesson) => {
  const {
    title,
    problem,
    description,
    positive,
    negative,
    memberCountries,
    scale,
    societalSectors,
    response,
    crossCutting,
    recovery,
  } = lesson;
  console.log(lesson);
  const ss = l(societalSectors);
  // const mc = otherCountries ? l([...(memberCountries || []), otherCountries]) : l(memberCountries);
  const mc = l(memberCountries || []);
  const md = `
<h4 class="primary-text center-align">${title}</h4>

${showEditors(lesson)}

<h5 class="primary-text center-align">Problem description</h5>
This ${
    scale && scale.length > 0 ? scale[0].toLowerCase() : scale
  } lesson addresses the following problem in ${mc}, and affects the societal sector ${ss}: ${p(problem)}.

<h5 class="primary-text center-align">Solution</h5>

The applied solution to the problem was the following: ${p(description)}. ${
    positive ? `This resulted in the following positive result: ${p(positive)}.` : ''
  } ${negative ? `It also lead to the following negative result: ${negative}.` : ''}

CM functions of the solution:
${p(response, `- Response: ${l(response)}`)}
${p(crossCutting, `- Cross-cutting: ${l(crossCutting)}`)}
${p(recovery, `- Recovery: ${l(recovery)}`)}

${showSources(lesson)}
`;

  return { md };
};

export interface IFormattedEvent extends Attributes {
  event: ILesson;
}

export const FormattedLesson: FactoryComponent<IFormattedEvent> = () => {
  return {
    view: ({ attrs: { event } }) => {
      const { md } = formatLesson(event);
      return m('.row', [m('.col.s12', m(SlimdownView, { md }))]);
    },
  };
};
