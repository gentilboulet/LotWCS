import * as React from 'react';

export interface ITabProps {
    tabId: string;
    title: string;
}

class Tab extends React.Component<ITabProps, object> {}

export { Tab };
