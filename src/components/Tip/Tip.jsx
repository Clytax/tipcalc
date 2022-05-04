import React, { useState, useEffect } from 'react';
import './Tip.scss';

// Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';

const Tip = () => {
  // Label Outpus
  const [outputTip, setTipPerPerson] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Bill and NumberOfPeople
  const [bill, setBill] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);

  // Select Tip
  const [selectedValue, setSelectedValue] = useState(null);
  const [customValue, setCustomValue] = useState(null);
  const handleCustom = (val) => {
    setCustomValue('');

    if (!isNumber(val)) {
      if (selectedValue != null) {
        setSelectedValue(null);
      }
      if (val > 100) {
        setCustomValue(100);
      } else {
        setCustomValue(val);
        setSelectedValue(val);
      }
    }
  };

  const isNumber = (val) => {
    return /[^0-9]/.test(val);
  };
  const handleClick = (val) => {
    if (selectedValue != null) {
      setSelectedValue(null);
      setCustomValue(null);
    }
    setSelectedValue(val);
  };

  const handleReset = () => {
    setSelectedValue(null);
    setCustomValue(null);
    setBill(null);
    setNumberOfPeople(null);
    setTipPerPerson(0);
    setTotalAmount(0);
  };

  // Error
  const [noBill, setNoBill] = useState(false);
  const [noPeople, setNoPeople] = useState(false);

  useEffect(() => {
    if (bill === null) {
      setNoBill(true);
    } else {
      setNoBill(false);
    }
    if (numberOfPeople === null) {
      setNoPeople(true);
    } else {
      setNoPeople(false);
    }
    if (bill !== null && numberOfPeople !== null && selectedValue !== null) {
      calcTipAmount();
      calcTotalAmount();
    } else {
      setTotalAmount(0);
      setTipPerPerson(0);
    }
  }, [selectedValue, customValue, bill, outputTip, numberOfPeople]);

  const calcTipAmount = () => {
    // Bill  * (1 + (tip / 100)) / numberOfPeople
    let tipAmount = 0;

    tipAmount = parseFloat(
      (bill * (selectedValue / 100)) / numberOfPeople,
    ).toFixed(2);
    setTipPerPerson(tipAmount);
  };

  const calcTotalAmount = () => {
    // Bill + (Bill * (tip / 100))
    let totalAmount = 0;
    let totalTip = +outputTip * numberOfPeople;
    totalAmount = +bill + totalTip;
    console.log(outputTip);

    setTotalAmount(totalAmount.toFixed(2));
  };

  return (
    <div className="tip">
      <div className="tip__input">
        <div className="tip__input__bill-container">
          <p className="tip__input__bill-p">Bill</p>
          <div
            className={`tip__input__people__inner-container ${
              noBill ? 'zero-container' : 'filled-container '
            }`}
          >
            <AttachMoneyIcon style={{ fill: '#9EBBBD' }} />
            <input
              onChange={(e) => {
                if (e.target.value === '') {
                  setBill(null);
                } else {
                  if (!isNumber(e.target.value)) {
                    setBill(e.target.value);
                  }
                }
              }}
              value={bill ? bill : ''}
              className="tip__input__bill__inner-input"
              placeholder="0"
            />
          </div>
        </div>
        <div className="tip__input__tip-container">
          <p className="tip__input__tip-p">Select Tip %</p>
          <div className="tip__input__tip__selection-container">
            <button
              className={`tip__input__tip__selection-button  ${
                selectedValue === 5 ? 'selected-button' : ''
              }`}
              onClick={() => handleClick(5)}
            >
              5%
            </button>
            <button
              className={`tip__input__tip__selection-button  ${
                selectedValue === 10 ? 'selected-button' : ''
              }`}
              onClick={() => handleClick(10)}
            >
              10%
            </button>
            <button
              className={`tip__input__tip__selection-button  ${
                selectedValue === 15 ? 'selected-button' : ''
              }`}
              onClick={() => handleClick(15)}
            >
              15%
            </button>
            <button
              className={`tip__input__tip__selection-button  ${
                selectedValue === 25 ? 'selected-button' : ''
              }`}
              onClick={() => handleClick(25)}
            >
              25%
            </button>
            <button
              className={`tip__input__tip__selection-button  ${
                selectedValue === 50 ? 'selected-button' : ''
              }`}
              onClick={() => handleClick(50)}
            >
              50%
            </button>

            <input
              className="tip__input__tip__selection-custom"
              placeholder="Custom"
              value={`${customValue === null ? '' : customValue}`}
              onChange={(e) => handleCustom(e.target.value)}
            />
          </div>
        </div>
        <div className="tip__input__people-container">
          <p className="tip__input__people-p">Number of People</p>
          <div
            className={`tip__input__people__inner-container ${
              noPeople ? 'zero-container' : 'filled-container '
            }`}
          >
            <PersonIcon style={{ fill: '#9EBBBD' }} />
            <input
              className="tip__input__people__inner-input"
              placeholder="0"
              value={numberOfPeople ? numberOfPeople : ''}
              onChange={(e) => {
                if (e.target.value === '') {
                  setNumberOfPeople(null);
                } else {
                  if (!isNumber(e.target.value)) {
                    setNumberOfPeople(e.target.value);
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="tip__output">
        <div className="tip__output__tip_amount-container">
          <p className="tip__output__tip_amount-p">
            <span className="tip__output__tip_amount-1span">Tip Amount </span>
            <span className="tip__output__tip_amount-2span">/ person</span>
          </p>
          <label className="tip__output__tip_amount-label">
            ${outputTip ? outputTip : '0.00'}
          </label>
        </div>
        <div className="tip__output__total-container">
          <p className="tip__output__total-p">
            <span className="tip__output__total-1span">Total </span>
            <span className="tip__output__total-2span">/ person</span>
          </p>
          <label className="tip__output__total-label">
            ${totalAmount ? totalAmount : '0.00'}
          </label>
        </div>

        <button
          className="tip__output__reset-button"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Tip;
