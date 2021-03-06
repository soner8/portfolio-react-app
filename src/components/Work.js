import React from "react";
import PropTypes from "prop-types";

import { Redirect } from "react-router";

import Showcase from "./Showcase";
import ShowcaseButton from "./ShowcaseButton";

import workList from "./data/workList";
// import AnimatedWrapper from "./AnimatedWrapper";

const workListLength = workList.length;

const pathToId = {
  "plinth-2017": 0,
  "mun-2017": 1,
  timespread: 2,
  zento: 3,
  flash: 4,
  "plinth-2016": 5,
  "event-graphia": 6,
  "event-graphia-angular": 7
};

class WorkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: workList[0],
      index: 0,
      nextPage: "",
      previousPage: ""
    };
    this.showNextWork = this.showNextWork.bind(this);
    this.showPreviousWork = this.showPreviousWork.bind(this);
    this.renderCurrentWork = this.renderCurrentWork.bind(this);
  }

  componentWillMount() {
    this.renderCurrentWork();
  }

  renderCurrentWork(path) {
    let pathNameArray = [];
    if (path === undefined) {
      pathNameArray = this.props.location.pathname.split("/");
    } else {
      pathNameArray = path.split("/");
    }
    const pathName = pathNameArray[pathNameArray.length - 1];
    let workIndex = pathToId[pathName];
    debugger;
    if (this.props.match.path === "/work") {
      this.initialPage = true;
      workIndex = 0;
    }

    if (workIndex !== undefined) {
      const nextPageIndex = (workIndex + 1) % workListLength;
      const previousPageIndex =
        (((workIndex - 1) % workListLength) + workListLength) % workListLength;

      this.setState({
        work: workList[workIndex],
        index: workIndex,
        nextPage: workList[nextPageIndex].detailLink,
        previousPage: workList[previousPageIndex].detailLink
      });
    } else {
      this.setState({
        work: {},
        index: -1,
        nextPage: -1,
        previousPage: -1
      });
    }
  }

  showNextWork() {
    const index = (this.state.index + 1) % workList.length;
    if (this.initialPage) {
      this.props.history.push("/work/" + workList[index].detailLink);
    } else {
      this.props.history.push(workList[index].detailLink);
    }
    this.setState({
      work: workList[index],
      index
    });
  }

  showPreviousWork() {
    const index =
      (((this.state.index - 1) % workListLength) + workListLength) %
      workListLength; // because JS modules can return negative too!
    if (this.initialPage) {
      this.props.history.push("/work/" + workList[index].detailLink);
    } else {
      this.props.history.push(workList[index].detailLink);
    }
    this.setState({
      work: workList[index],
      index
    });
  }

  render() {
    debugger;
    return (
      <section>
        {this.state.index === -1 ? (
          <Redirect to="/404" />
        ) : (
          <div className="row work-row align-center">
            <ShowcaseButton
              direction="left"
              imagePath={require("../media/left.svg")}
              onClickHandler={this.showPreviousWork}
            />
            <Showcase work={this.state.work} />
            <ShowcaseButton
              direction="right"
              imagePath={require("../media/left.svg")}
              onClickHandler={this.showNextWork}
            />
          </div>
        )}
      </section>
    );
  }
}

WorkComponent.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};

// const Work = AnimatedWrapper(WorkComponent);
export default WorkComponent;
