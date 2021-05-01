import React from "react";

export default class CountDownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {until: props.until, offset: props.offset, name: props.name};    
  }

  componentDidMount() {
    this.tick()
    let timer = setInterval(this.tick.bind(this), 1000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    const until = this.state.until;
    this.setState({
      secondsUntilSpawn: Math.floor((until - Date.now() - this.state.offset)/1000)
    });
  }

  render() {    
    return (
      <div>
          <p>name is {this.state.name}</p>
          <p>spawntime is {this.state.secondsUntilSpawn}</p>
      </div>
    )
  }
}
