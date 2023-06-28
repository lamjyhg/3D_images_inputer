import React from 'react';

// mui
import { Input, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

// style
import './style.scss';

const actions = [
  {
    value: 'translate',
    key: 'translate',
    tooltipContent: 'transate',
    icon: <OpenWithIcon />,
  },
  {
    value: 'rotate',
    key: 'rotate',
    tooltipContent: 'rotate',
    icon: <ThreeSixtyIcon />,
  },
  {
    value: 'scale',
    key: 'scale',
    tooltipContent: 'scale',
    icon: <AspectRatioIcon />,
  },
];

export default function CanvasHeader({ save, addItemIntoCanvas, setAction }) {
  async function addImage(e) {
    addItemIntoCanvas(e.target.files[0]);
  }

  return (
    <header className="canvas__header">
      <h1>Jeun's dream</h1>
      <div className="canvas__header__actions">
        <ToggleButtonGroup size="small">
          <Tooltip title="come soon" placement="bottom">
            <ToggleButton value={'save'} key={'save'} onClick={save}>
              <SaveAltIcon></SaveAltIcon>
            </ToggleButton>
          </Tooltip>
          <ToggleButton
            value={'add'}
            key={'add'}
            className="addImageButton"
            autoFocus={false}
          >
            <AddPhotoAlternateIcon />
            <label>
              <Input
                inputProps={{ accept: 'image/png, image/jpeg' }}
                id="addImageButton__input"
                type="file"
                onChange={addImage}
              />
            </label>
          </ToggleButton>

          <Tooltip
            title="please double click item to delete item"
            placement="bottom"
          >
            <ToggleButton value={'delete'} key={'delete'}>
              <DeleteIcon></DeleteIcon>
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          size="small"
          className="canvas__header__actions__group"
        >
          {actions.map((action) => (
            <Tooltip
              title={action.tooltipContent}
              key={action.key}
              placement="bottom"
            >
              <ToggleButton
                value={action.value}
                key={action.key}
                onClick={() => {
                  setAction(action.value);
                }}
              >
                {action.icon}
              </ToggleButton>
            </Tooltip>
          ))}
        </ToggleButtonGroup>
      </div>
    </header>
  );
}
