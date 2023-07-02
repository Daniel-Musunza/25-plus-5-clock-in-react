
let timeDifference;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      minutes : 25,
      seconds : 0,
      break : 5,
      session : 25,
      playing : false,
      stopped : true,
      breaking : false
    }
  }
  
  play = () => {
    if(!this.state.playing){
      this.setState({playing : true, stopped : false});
      timeDifference = settimeDifference(() => {this.setState({seconds : this.state.seconds - 1})},1000);
    }else{
      this.pause();
    }   
  }
  
  reset = () => {
    this.setState({minutes : this.state.session, seconds : 0, stopped : true, session : 25, break : 5, breaking : false});
    this.pause();
    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }
  
  pause = () => {
    this.setState({playing : false});
    cleartimeDifference(timeDifference);
  }
  
  timerDisplay = () => {
    let minutesDisplay = this.state.minutes.toString();
    let secondsDisplay = this.state.seconds.toString();
    if(this.state.minutes <= 9){
      minutesDisplay = '0' + minutesDisplay;               
    }
    
    if(this.state.seconds <= 9){
      secondsDisplay = '0' + secondsDisplay;
    }
    
    return minutesDisplay + ':' + secondsDisplay
  }
  
  playBeep = () => {
    let audio = document.getElementById('beep');
    audio.currentTime = 0;
    audio.play();
  }
  
  render(){   
    if(this.state.seconds < 0 && this.state.minutes > 0){
      this.setState({seconds : 59, minutes : this.state.minutes - 1});
    }
    
    if(this.state.stopped && this.state.minutes !== this.state.session){
      this.setState({minutes : this.state.session});
    }
    
    if(this.state.minutes === 0 && this.state.seconds < 0){
      this.playBeep();
      if(this.state.breaking){
        this.setState({minutes : this.state.session, seconds : 0, breaking : false})
      }else{
        this.setState({minutes : this.state.break, seconds : 0, breaking : true});
      }    
    }
    
    return(
        <div id = 'clock' className="App">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>
         <header className="App-header">
          <div id ='main' className="dual-container">
            <div id = 'title-container'>
              <h3 id = 'title'>25 + 5 Clock</h3>
            </div>
            <div id = 'break-session-container' className="lengths">
              <div id = 'break' className="time-sets">
                <p id = 'break-label'>Break Length</p>
                <div id = 'break-info'>
                  <button id = 'break-decrement' onClick = {() => this.setState({break : this.state.break - 1 >= 1 ? this.state.break - 1 : this.state.break})}><i class="fas fa-minus fa-2x" ></i></button>
                  <p id = 'break-length'>{this.state.break.toString()}</p>
                  <button id = 'break-increment' onClick = {() => this.setState({break : this.state.break + 1 <= 60 ?  this.state.break + 1 : this.state.break})}><i class="fas fa-plus fa-2x" ></i></button>
                </div>         
              </div>
              <div id = 'session' className="time-sets">
                <p id = 'session-label'>Session Length</p>
                <div id = 'session-info'>
                  <button id = 'session-decrement' onClick = {() => this.setState({session : this.state.session - 1 >= 1 ? this.state.session - 1 : this.state.session})}><i class="fas fa-minus fa-2x"></i></button>
                  <p id = 'session-length'>{this.state.session.toString()}</p>
                  <button id = 'session-increment' onClick = {() => this.setState({session : this.state.session + 1 <= 60 ?  this.state.session + 1 : this.state.session})}><i class="fas fa-plus fa-2x"></i></button>
                </div>
                
              </div>
            </div>
            <div id = 'timer-container'>
              <div id = 'timer'>
                <audio id = 'beep' preload = 'auto' src = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
                <p id = 'timer-label'>{this.state.breaking ? 'Break' : 'Session'}</p>
                <p id = 'time-left'>{
                    this.state.minutes <= 9 && this.state.seconds <= 9 ?
                      '0' + this.state.minutes.toString() + ':' +           '0' + this.state.seconds.toString() : 
                    this.state.minutes <= 9 && this.state.seconds > 9 ? 
                      '0' + this.state.minutes.toString() + ':' +  
this.state.seconds.toString() : 
                    this.state.minutes > 9 && this.state.seconds <= 9 ?
                      this.state.minutes.toString() + ':' + '0' + this.state.seconds.toString() :                     
                      this.state.minutes.toString() + ':' + this.state.seconds.toString()
                     }</p>
              </div>
              <div id = 'timer-buttons'>
                <button id = 'start_stop' onClick = {this.play}>{this.state.playing ? <i className ="fas fa-pause fa-2x"></i> : <i className ="fas fa-play fa-2x"></i>}</button>
                <button id = 'reset' onClick = {this.reset}><i class="fas fa-redo-alt fa-2x"></i></button>
              </div>           
            </div>           
          </div>
          </header>
        </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));