import type { definition } from "../util/types";

export const definitions: definition[] = [
    {
        content:
            "[[Nuyorican:nuyorican]] design [[engineer]] living in the [[Bay Area:bayarea]] of California.",
        footnotes: [
            {
                id: "nuyorican",
                linkTitle: "Nuyorican",
                linkUrl: new URL("https://gawain-pvt.netlify.app/"),
                linkDescription: `Nuyorican is a portmanteu of "New Yorker" and "Puerto Rican"`,
                openInNewTab: true,
            },
            {
                id: "engineer",
                linkTitle: "Github",
                linkUrl: new URL("https://github.com/taurean"),
                linkDescription: `where I currently host my public repos and gists`,
                openInNewTab: true,
            },
            {
                id: "bayarea",
                linkTitle: "My favorite places",
                linkUrl: new URL(
                    "https://guides.apple.com/?ug=ChtNeSBmYXZvcml0ZSBCYXkgQXJlYSBwbGFjZXMSDgiuTRC016fir4Hh48cBEg0Irk0Qy9fL7sTRrPtyEg4Irk0QpKblpLqosqWQARIOCK5NEPTtspjx5pjajQESDgiuTRCkzczorIndzYEBEg4Irk0QxLDtobSpqeO5ARINCK5NEJu2xN%2FjoaORIhIOCK5NEMnjwafFiYqXtwE%3D",
                ),
                linkDescription: `some of my favorite places to go in the bay`,
                openInNewTab: true,
            },
        ],
    },
    {
        content: "maker of [[feeds:bluesky]]",
        footnotes: [
            {
                id: "bluesky",
                linkTitle: "Bluesky",
                linkUrl: new URL("https://bsky.app/profile/taurean.posts.cv"),
                linkDescription: `my go-to microblogging platform`,
                openInNewTab: true,
            },
        ],
    },
    {
        content: "the design engineer behind [[Haiku:haiku]]",
        footnotes: [
            {
                id: "haiku",
                linkTitle: "Haiku Notes",
                linkUrl: new URL("https://preview.haikunotes.com"),
                linkDescription: `a journaling tool to help with self reflection`,
                openInNewTab: true,
            },
        ],
    },
    {
        content: "an amateur portrait and landscape [[photographer:glass]]",
        footnotes: [
            {
                id: "glass",
                linkTitle: "Glass",
                linkUrl: new URL("https://glass.photo/taurean"),
                linkDescription: `a social network for photographers focused on their work`,
                openInNewTab: true,
            },
        ],
    },
    {
        content: "a reluctant and inconsistent [[reader:literalclub]]",
        footnotes: [
            {
                id: "literalclub",
                linkTitle: "Literal Club",
                linkUrl: new URL("https://literal.club/taurean"),
                linkDescription: `a goodreads competitor but… better`,
                openInNewTab: true,
            },
        ],
    },
    {
        content: "an avid [[fan:letterboxd]] of movies",
        footnotes: [
            {
                id: "letterboxd",
                linkTitle: "Letterboxd",
                linkUrl: new URL("https://letterboxd.com/taurean/stats/"),
                linkDescription: `goodreads but for movies`,
                openInNewTab: true,
            },
        ],
    },
    {
        content: "a casual music [[lover:recordclub]]",
        footnotes: [
            {
                id: "recordclub",
                linkTitle: "Record Club",
                linkUrl: new URL("https://record.club/taurean"),
                linkDescription: `goodreads but for music. actually, letterboxd for music.`,
                openInNewTab: true,
            },
        ],
    },
];
