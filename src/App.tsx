import React, { useRef, useState } from 'react';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonInput,
  IonAlert,
} from '@ionic/react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControls from './components/InputControls';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from './components/InputControls';

const App: React.FC = () => {
  // const [showAlertCheckInputs, setShowAlertCheckInputs] = useState(false);
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    const enteredHeight = +heightInputRef.current!.value!;
    const enteredWeight = +weightInputRef.current!.value!;

    if (enteredHeight <= 0 || enteredWeight <= 0) {
      // setShowAlertCheckInputs(true);
      setError('Please enter valid (non-negative) numbers!');
      return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversionfactor = calcUnits === 'ftlbs' ? 3.28 : 1;
    const weight = enteredWeight / weightConversionFactor;
    const height = enteredHeight / heightConversionfactor;
    const bmi = weight / (height * height);

    if (isNaN(bmi)) {
      alert('Not a number, please check inputs!');
      return;
    }
    setCalculatedBmi(bmi);
  };
  const resetInputs = () => {
    heightInputRef.current!.value = '';
    weightInputRef.current!.value = '';
    setCalculatedBmi(undefined);
  };

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return (
    <React.Fragment>
      <IonAlert
        // isOpen={showAlertCheckInputs}
        isOpen={!!error}
        // onDidDismiss={() => setShowAlertCheckInputs(false)}
        onDidDismiss={() => setError('')}
        // message={'Please enter valid (non-negative) numbers!'}
        message={error}
        buttons={['OK']}
        // header={'Alert'}
        // subHeader={'Subtitle'}
      />

      <IonApp>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControls
                  selectedValue={calcUnits}
                  onSelectValue={selectCalcUnitHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>
                    Your Height ({calcUnits === 'mkg' ? 'meters' : 'feet'})
                  </IonLabel>
                  <IonInput type='number' ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>
                    Your Weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})
                  </IonLabel>
                  <IonInput type='number' ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBmi} onReset={resetInputs} />
            {calculatedBmi ? <BmiResult result={calculatedBmi} /> : null}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
