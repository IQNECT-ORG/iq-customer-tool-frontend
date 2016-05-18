import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FilterDate from '../panes/FilterDate';
import FilterTrigger from '../panes/FilterTrigger';
import Submit from 'app/common/components/forms/Submit';

const render = (props) => {
  return (
    <form className="form--content" onSubmit={props.onSubmit}>
      <Tabs
        onSelect={ _ => {} }
        selectedIndex={0}>
        <TabList>
          <Tab>By Date</Tab>
          <Tab>By Trigger</Tab>
        </TabList>

        <TabPanel>
          <FilterDate
            fields={props.fields}/>
        </TabPanel>
        <TabPanel>
          <FilterTrigger
            fields={props.fields}/>
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