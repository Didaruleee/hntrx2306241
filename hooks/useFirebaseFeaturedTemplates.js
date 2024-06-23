// import db from '../utils/firebase';
import { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useFirebaseFeaturedTemplates() {
    const [featuredTemplates, setFeaturedTemplates] = useState([]);

    // useEffect(() => {
    //   const unsubscribe = db
    //     .collection('featuredTemplates')
    //     .orderBy('order', 'asc')
    //     .onSnapshot((snapshot) => {
    //       const firebaseTemplates = [];
    //       snapshot.forEach((doc) => {
    //         firebaseTemplates.push(doc.data());
    //       });
    //       setFeaturedTemplates(firebaseTemplates);
    //     });

    //   return () => unsubscribe();
    // }, []);

    return featuredTemplates;
}
// export default useFirebaseFeaturedTemplates;
