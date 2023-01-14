import React, {Component} from 'react';
import Loginpage from "./components/login/Loginpage";
import Mainpage from "./components/main/Mainpage";

class App extends Component {
  componentDidMount() {
    this.props.store.subscribe(() => {
      this.setState({reduxState: this.props.store.getState()});
    })
  }

  render() {
    const styles = {
      h2: {
          display: "table",

          fontFamily: "monospace",
          fontWeight: "bolder",
          fontSize: "250%",
          borderBlock: "2px solid black",
          borderRadius: "15px",
          margin: "auto",
          marginTop: "2%",
          padding: "0.5%",
          backgroundColor: "#bbb2e9"

      }
  }
    return (<div  className="firstPage" style={{

    }}><h2 style={styles.h2} align="center" id="authors">Захар Сотниченко, Кавеев Роман | P33202 | вар. 2345</h2><br/>
      { console.log(this.props.store.getState().login)}
      {this.props.store.getState().login !== null ? <Mainpage/> :<Loginpage/>}

    </div>)
  }
}

export default App;