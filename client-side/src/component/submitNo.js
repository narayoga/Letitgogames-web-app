import './component.css';

export default function NoSubmit(props) {
    const {command} = props
    return(
        <button type="submit"
        className="mb-4 form-btn-submit" 
        style={{width:'100%',
                backgroundColor: 'transparent',
                color:'#f3c669',
                border: '1px solid #404040',
                padding:'12px 0',
                fontSize:'14px',
                fontWeight:'bolder'}}>
            {command}
        </button>
    )
}