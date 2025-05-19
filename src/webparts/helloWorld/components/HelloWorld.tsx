import * as React from 'react';
// import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';

import { PrimaryButton, DefaultButton, IconButton , TextField, ChoiceGroup, Dropdown, ComboBox, Slider,  Checkbox, Toggle, SearchBox, Link, SpinButton, DatePicker} from '@fluentui/react';
export default class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactElement<IHelloWorldProps> {


    return (
    <>
    <p>Hello World{6+9}</p>

    <PrimaryButton text='Save' iconProps={{iconName:'save'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
    
    <DefaultButton text='Edit' iconProps={{iconName:'edit'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
    <IconButton text='Delete' iconProps={{iconName:'delete'}}/>
    <hr/>
    <SearchBox placeholder='search here' iconProps={{iconName:'search'}}/>
    <br/>
    <br/>
    <form>
      {/* <Label> Full Name</Label> */}
      <TextField type='text' label='Full Name' placeholder='vijay thapak' required/>
      <TextField type='password' label='Password'/>
      <TextField type='text' multiline rows={5} placeholder='Enter your address....' iconProps={{iconName:'home'}} label='Permanent Address'/>
      <TextField prefix='$' label='Salary' suffix='$USD'/>
      <TextField label='I am read only' disabled/>
      <TextField label='Error Message' errorMessage='Please enter your password'/>
      <ChoiceGroup
      options={[
        {key:'Male',text:'Male'},
        {key:'Female',text:'Female'}
      ]}
      label='Gender'
      />
      <Dropdown
      label='Department'
      options={[
        {key:'IT',text:'IT'},
        {key:'HR',text:'HR'},
        {key:'Account',text:'Account'}
      ]}
      placeholder='--select--'
      />
       <Dropdown
      label='Multi Select'
      options={[
        {key:'IT',text:'IT'},
        {key:'HR',text:'HR'},
        {key:'Account',text:'Account'}
      ]}
      placeholder='--select--'
      multiSelect
      />
       <ComboBox
      label='Multi Select'
      options={[
        {key:'IT',text:'IT'},
        {key:'HR',text:'HR'},
        {key:'Account',text:'Account'}
      ]}
      placeholder='--select--'
      multiSelect
      allowFreeInput
      autoComplete='on'
      />
      <Slider label='Score' min={0} max={100} step={1}/>
      <Checkbox label='Consent'/>
      <Toggle label='Permission' onText='ON' offText='OFF' defaultChecked/>
      <Link href='https://www.google.com'>Google</Link>
      <SpinButton min={0} max={100} step={1} />
      <DatePicker label='DOJ'/>
      <button>Simple Button</button>
    </form>
    </>
    );
  }
}
