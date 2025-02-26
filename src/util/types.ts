export type footnote = {
    id: string;
    linkTitle: string;
    linkUrl: URL;
    linkDescription: string;
    openInNewTab: boolean;
};

export type definition = {
    content: string;
    footnotes: footnote[];
};

export type quote = {
    quote: string;
    source: string;
    sourceUrl?: URL;
};
