import React from "react";
import store from "../../app/store";
import "./logout.css"



function Logout() {
    const logout = e => {
        store.dispatch({type: "change", value: null});
        console.log(store.getState());
    }
    return (<div>
            <button primary id="but" type="button" onClick={logout}
        style={{
          marginRight: 10,
          color: '#222',
          border: '1px solid #222',
          borderBottom: '1px solid #222',
          borderRadius: 2,
          background: '#fff',
        }}
        hoverStyle={{
          border: '1px solid red',
          borderBottom: '1px solid red',
          color: '#red',
          background: '#fff',
        }}
        focusStyle={{
          border: '1px solid red',
          borderBottom: '1px solid red',
          color: '#red',
          background: '#fff',
          boxShadow: 'red 0px 0px 5px',
        }}
        activeStyle={{
          border: '1px solid red',
          borderTop: '1px solid red',
          color: '#000',
          background: '#fff',
        }}>
        Выйти
        </button>

        </div>
    )
}
export default Logout