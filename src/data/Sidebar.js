import React from 'react';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import SearchIcon from '@mui/icons-material/Search';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

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
        title: "Academic Advising",
        icon: <QuestionAnswerIcon />,
        link: "/advising"
    },
    {
        title: "Administration",
        icon: <ListAltIcon />,
        link: "/admin"
    },
    {
        title: "Profile",
        icon: <PersonIcon />,
        link: "/profile"
    }
]