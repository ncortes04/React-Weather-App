import '../styles/loading.css'

export default function Loading() {
    return(
        <div className='loading-container'>
            <div className='loading-dot blue'></div>
            <div className='loading-dot green'></div>
            <div className='loading-dot orange'></div>
            <div className='loading-dot yellow'></div>
        </div>
    )
}