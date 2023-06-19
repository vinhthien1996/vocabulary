import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import reactStringReplace from 'react-string-replace';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { title, data } from './Data/2';

function Content() {

  const [count, setCount] = useState(0);
  const [vocabulary, setVocabulary] = useState(data[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isVietnamese, setIsVietnamese] = useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [time, setTime] = useState(10000);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCount((prevCount) => (prevCount < data.length - 1 ? prevCount + 1 : 0));
      }
    }, time);

    return () => clearInterval(timer);
  }, [isHovered, time]);

  useEffect(() => {
    if (count < data.length) {
      setVocabulary(data[count]);
    }
  }, [count]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const highlightText = (text, key) => {
    return reactStringReplace(text, key, () => (<br/>));
  }

  useEffect(() => {
    console.log(data)
  }, []);

  const toggleDefination = () => {
    setIsVietnamese(prevIsVietnamese => !prevIsVietnamese);
  }
  
  return (
    <div>
      <div className={styles.menu}>
        {isVietnamese ? <EyeIcon className="h-6 w-6 text-gray-600 cursor-pointer" onClick={toggleDefination} /> : <EyeSlashIcon className="h-6 w-6 text-gray-600 cursor-pointer" onClick={toggleDefination} />}
      </div>
      <div className={styles.ribbon}>{title}</div>
      { vocabulary && <div className={styles.content}>
        <div className='mb-16'>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='drop-shadow-xl text-8xl font-bold text-orange-600'>{vocabulary.en}</div>
          {isVietnamese && <div className='mt-4'>
            <div className='text-5xl font-bold text-gray-700'>{highlightText(vocabulary.vi, '||')}</div>
          </div>}
        </div>
        <div className='text-3xl text-gray-700'>{vocabulary.exEN}</div>
        <div className='text-3xl text-gray-700'>{vocabulary.exVI}</div>
      </div>}


      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg font-bold mt-1 ml-1">
                    Time
                  </h3>
                  <XMarkIcon className="w-5 h-5 float-right cursor-pointer mt-2 mr-1" onClick={() => setShowModal(false)} />
                </div>
                <div className="relative p-3 flex-auto">
                  <input value={time / 1000} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>
                <div className="flex items-center justify-center p-3 border-t border-solid border-slate-200 rounded">
                  <button className="bg-orange-600 text-white w-full font-bold text-sm px-6 py-3 rounded"
                    type="button"
                    onClick={() => {
                      setTime()
                      setShowModal(false);
                    }}
                  >
                    Set Time
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default Content