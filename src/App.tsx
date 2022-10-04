/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Caourusel css */
import "swiper/css";
import "./app.css";
import {
  IonApp,
  setupIonicReact,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonCardContent,
  IonCardTitle,
  IonToast,
} from "@ionic/react";

import { useState } from "react";
import { useFeatureFlag } from "configcat-react";
import amplitude from "amplitude-js";
import Caourusel from "./components/Carousel";
import Button from "./components/Button";
setupIonicReact();

const App: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const AMPLITUDE_KEY = "[insert-aplitude-key-here]";
  let AmplitudeInstance = amplitude.getInstance().init(AMPLITUDE_KEY);
  
  const USER_ID = "someUserId1234";

  const { value: isNewColorEnabled, loading } = useFeatureFlag(
    "isnewcolorenabled",
    false,
    { identifier: USER_ID }
  );

  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen class="wrapper">
          <IonHeader translucent>
            <IonToolbar className="toolbar">
              <IonTitle size="large">A/B Testing</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonItem className="hint">
            {isNewColorEnabled ? (
              <IonLabel className="toolbar">Hint: Variant is shown</IonLabel>
            ) : (
              <IonLabel className="toolbar">Hint: Original is shown</IonLabel>
            )}
          </IonItem>

          {loading ? (
            <IonLabel>Fetching content</IonLabel>
          ) : (
            <>
              <Caourusel />
              <IonCardContent className="content">
                <IonLabel>
                  <h4>Pet Care Center</h4>
                </IonLabel>
                <IonCardTitle>
                  <h2>Rescue your next best friend</h2>
                </IonCardTitle>
                <p>Cats and Dogs, ready for a new home. Get yours today.</p>
                <Button
                  USER_ID={USER_ID}
                  AmplitudeInstance={AmplitudeInstance}
                  setShowToast={setShowToast}
                  button_color={isNewColorEnabled ? "variant" : "original"}
                />
              </IonCardContent>
            </>
          )}
          <IonToast
            position="top"
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={
              isNewColorEnabled ? "variant clicked!" : "original clicked!"
            }
            duration={2000}
          />
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default App;
