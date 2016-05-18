import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FilterDate from './panes/FilterDate';
import FilterTrigger from './panes/FilterTrigger';

const render = (props) => {
  return (
    <div>
      <Tabs
        onSelect={ _ => {} }
        selectedIndex={0}>
        <TabList>
          <Tab>By Date</Tab>
          <Tab>By Trigger</Tab>
        </TabList>

        <TabPanel>
          <FilterDate/>
        </TabPanel>
        <TabPanel>
          <FilterTrigger/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default render;