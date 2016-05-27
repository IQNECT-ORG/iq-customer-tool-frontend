import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FilterDate from '../panes/FilterDate';
import FilterTrigger from '../panes/FilterTrigger';
import FilterFrame from '../panes/FilterFrame';
import Submit from 'app/common/components/forms/Submit';

const render = (props) => {
  return (
    <form className="form--content" onSubmit={props.onSubmit}>
      <Tabs
        onSelect={ () => {} }
        selectedIndex={0}>
        <TabList>
          <Tab>By Date</Tab>
          <Tab>By Trigger</Tab>
          <Tab>By Frame</Tab>
        </TabList>

        <TabPanel>
          <FilterDate
            fields={props.fields}
            onDatePresetClick={props.onDatePresetClick}/>
        </TabPanel>
        <TabPanel>
          <FilterTrigger
            fields={props.fields}
            triggers={props.triggers}
            onTriggerClick={props.onTriggerClick}/>
        </TabPanel>
        <TabPanel>
          <FilterFrame
            frames={props.frames}
            onFrameClick={props.onFrameClick}/>
        </TabPanel>
      </Tabs>
      <div>
        <Submit
          className="btn btn-block btn-primary btn-radius-lg"
          isLoading={props.submitting}>
          Filter
        </Submit>
      </div>
    </form>
  );
};

export default render;