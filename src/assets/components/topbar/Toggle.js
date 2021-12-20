import { useEffect, useState } from 'react'
import './toggle.css'



const Toggle = (props) => {
    const { stat } = props;
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if(stat){
            document.getElementById('tog').checked = true;

            
        }
        else{
            document.getElementById('tog').checked = false;
        }
    }, [stat]);

    
    return (
        <div onClick={() => {
            // setEnabled(!enabled);
            // console.log(enabled);
        }} className={`toggle ${ enabled ? 'inactive' : ''}`}>
            <label class="switch">
                <input type="checkbox" id='tog'></input>
                <span class="slider round"></span>
            </label>
        </div>
      )
};


export default Toggle;
