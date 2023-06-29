import CloudSharpIcon from '@mui/icons-material/CloudSharp';
import './style.scss';
export default function CloudsLoader() {
  return (
    <div className="cloudLoader">
      <CloudSharpIcon style={{ color: 'white' }}></CloudSharpIcon>
      <CloudSharpIcon style={{ color: 'white' }}></CloudSharpIcon>
      <CloudSharpIcon style={{ color: 'white' }}></CloudSharpIcon>
    </div>
  );
}
