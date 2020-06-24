//import * as React from 'react';
import 'react-scroll-to-bottom'

declare module 'react-scroll-to-bottom' {
    //class ScrollToBottom extends React.Component<ScrollProps, any>{}

    export interface ScrollProps {
        checkInterval?: number,
        className?: string,
        debounce?: number,
        followButtonClassName?: string,
        mode?:string,
        scrollViewClassName?:string
    }
}
