import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FilterDate from './panes/FilterDate';
import FilterTrigger from './panes/FilterTrigger';
import FilterFrame from './panes/FilterFrame';
import FilterImage from './panes/FilterImage';
import Submit from 'app/common/components/atoms/Submit';
import Constants from 'app/common/Constants';

const render = (props) => {
  let tabList;
  let tabPanel;

  switch(props.campaign.type >> 0) {
    case Constants.CampaignTypes.IMAGE:
      tabList = (
        <TabList>
          <Tab>By Date</Tab>
          <Tab>By Image</Tab>
        </TabList>
      );

      tabPanel = (
        <TabPanel>
          <FilterImage
            triggers={props.triggers}
            onImageClick={props.onImageClick}/>
        </TabPanel>
      );
      break;
    case Constants.CampaignTypes.PDF:
      tabList = (
        <TabList>
          <Tab>By Date</Tab>
          <Tab>By Page</Tab>
        </TabList>
      );

      tabPanel = (
        <TabPanel>
          <FilterTrigger
            fields={props.fields}
            triggers={props.triggers}
            frames={props.frames}
            onFrameClick={props.onFrameClick}/>
        </TabPanel>
      );
      break;
    case Constants.CampaignTypes.VIDEO:
      tabList = (
        <TabList>
          <Tab>By Date</Tab>
          <Tab>By Frame</Tab>
        </TabList>
      );

      tabPanel = (
        <TabPanel>
          <FilterFrame
            frames={props.frames}
            onFrameClick={props.onFrameClick}/>
        </TabPanel>
      );
      break;
  }

  return (
    <form className="form--content" onSubmit={props.handleSubmit}>
      <Tabs
        onSelect={ () => {} }
        selectedIndex={0}>
        {tabList}

        <TabPanel>
          <FilterDate
            fields={props.fields}
            onDatePresetClick={props.onDatePresetClick}/>
        </TabPanel>
        {tabPanel}
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
render.displayName = 'FilterForm';

export default render;