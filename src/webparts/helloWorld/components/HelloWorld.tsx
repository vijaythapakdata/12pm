import * as React from 'react';
// import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';

import { PrimaryButton, DefaultButton, IconButton } from '@fluentui/react';
export default class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactElement<IHelloWorldProps> {


    return (
    <>
    <p>Hello World{6+9}</p>

    <PrimaryButton text='Save' iconProps={{iconName:'save'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
    
    <DefaultButton text='Edit' iconProps={{iconName:'edit'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
    <IconButton text='Delete' iconProps={{iconName:'delete'}}/>
    </>
    );
  }
}
