import React from 'react';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SearchIcon from '@mui/icons-material/Search';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const SidebarData = [
    {
        title: "Courses",
        icon: <AutoStoriesIcon />,
        link: "/course"
    },
    {
        title: "Browse Course Offerings",
        icon: <SearchIcon />,
        link: "/browse"
    },
    {
        title: "Graduation Progress",
        icon: <ListAltIcon />,
        link: "/progress"
    },
    {
        title: "Administration",
        icon: <ListAltIcon />,
        link: "/admin"
    }
]