import React from 'react';
import { Viro3DObject } from 'react-viro';
import _ from 'lodash';

import ModelObject from '@Component/MeshModels/ModelObject';

var modelList = {};

class ModelsManager {
    static modelList = {};

    static ParseData(data) {

    }

    static CreateModels(data) {
        console.warn('Here: ' + JSON.stringify(data));
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                console.warn(key + ' Imported!');
                modelList[key] = (<ModelObject key={key} data={element} />);
            }
        }
    }

    static GetModel(key) {
        return modelList[key];
    }
}

export default ModelsManager;
