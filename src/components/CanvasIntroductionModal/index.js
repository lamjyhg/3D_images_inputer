import { Button, Modal, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CloudIcon from '@mui/icons-material/Cloud';

import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';

import './style.scss';
import jeun from './../../images/jeun.jpg';
import CloudsLoader from '../CloudsLoader';
export default function CanvasIntroductionModal({
  open,
  setOpen,
  setDreamName,
}) {
  const [stage, setStage] = useState(-1);
  const [name, setName] = useState('');
  function nextStatge() {
    setStage(stage + 1);
  }
  function nextStatgeWithTimeOut() {
    const myTimeout = setTimeout(timeOutFunction, 2000);
    function timeOutFunction() {
      setStage(stage + 1);
      clearTimeout(myTimeout);
    }
  }

  function renderFirstSection() {
    return (
      <>
        <div className="leftChat">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString('Hi Dear  \n')

                .pauseFor(500)
                .typeString(
                  'Do you have an unforgettable dream？ I can help you record it!'
                )
                .callFunction(nextStatge)

                .start();
            }}
          />
        </div>
        {stage === 0 && (
          <div className="rightChat">
            <button
              className="btn-wide btn-normal"
              type="button"
              onClick={nextStatge}
            >
              <span>yes</span>
            </button>
          </div>
        )}
        {stage >= 1 && (
          <div className="rightChat">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString('yes').callFunction(nextStatge).start();
              }}
            />
          </div>
        )}

        {stage >= 2 && (
          <div className="leftChat">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('Can you name your dream? ')
                  .callFunction(nextStatge)
                  .start();
              }}
            />
          </div>
        )}

        {stage === 3 && (
          <div className="leftChat">
            <input
              placeholder="e.g. Jeun's dream"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        {stage === 3 && (
          <div className="rightChat">
            <button
              className="btn-wide btn-normal"
              type="button"
              onClick={nextStatge}
            >
              <span>confirm</span>
            </button>
          </div>
        )}
        {stage >= 4 && (
          <div className="rightChat">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${name.length > 0 ? name : "Jeun's Dream"} :)`)
                  .callFunction(nextStatgeWithTimeOut)
                  .start();
              }}
            />
          </div>
        )}
      </>
    );
  }

  function renderSecondSection() {
    return (
      <>
        {stage >= 5 && (
          <div className="middleChat">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('Let make your dream!')

                  .pauseFor(1000)
                  .callFunction(lastStage)

                  .start();
              }}
            />
          </div>
        )}
        {stage === 6 && (
          <div className="middleChat--clouds">
            <CloudsLoader></CloudsLoader>
          </div>
        )}
      </>
    );
  }

  function lastStage() {
    nextStatge();
    const myTimeout = setTimeout(closeModal, 3000);
    function closeModal() {
      setOpen(false);
      setDreamName(name.length > 0 ? name : "Jeun's dream ");
      clearTimeout(myTimeout);
    }
  }

  return (
    <Modal open={open} disableAutoFocus={true}>
      <div
        className={
          'canvasIntroductionModal ' +
          (stage >= 6 ? 'canvasIntroductionModal--fadeOut' : '')
        }
      >
        <form>
          <div class="chatWindow">
            {stage < 5 && renderFirstSection()}
            {stage >= 5 && renderSecondSection()}
          </div>
        </form>
      </div>
    </Modal>
  );
}
