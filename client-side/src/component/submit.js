import './component.css';

export default function Submit(props) {
    const {command, click} = props
    return(
        <button type="submit" data-testid="submit"
        className="mb-4 form-btn-submit" 
        onClick= {click}
        style={{width:'100%',
                backgroundColor: 'rgba(220, 220, 220, 0.2)',
                color:'white',
                border: 'none',
                padding:'12px 0',
                fontSize:'14px'}}>
            {command}
        </button>
    )
}