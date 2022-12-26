import img from '../images/100x100.png';

export default function DisplayBox() {
  return (
  <>
    <div className='displayBoxDisplay placeholder'>
      <div><img className='displayBoxImg placeholder' src={img} /></div>
      <div className='description'>{}</div>
    </div>
  </>);
}
