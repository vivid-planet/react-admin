import * as React from "react";
import { Hue, Saturation } from "react-color/lib/components/common";

import { colorToHex, stringToHSL, stringToHSV } from "../utils/colorSpaces";
import { IVPAdminColorPickerProps } from "./ColorPicker";

interface IPickerProps {
    color: string;
    onChange: (colorValue: string) => void;
}

const Picker: React.FC<IPickerProps & IVPAdminColorPickerProps> = ({ color, onChange, classes }) => (
    <>
        <div className={classes.saturationWrapper}>
            <Saturation
                hsl={stringToHSL(color)}
                hsv={stringToHSV(color)}
                pointer={() => <div className={classes.saturationPointer} />}
                onChange={(value) => onChange(colorToHex((value as unknown) as tinycolor.ColorInputWithoutInstance))}
            />
        </div>
        <div className={classes.hueWrapper}>
            <Hue
                hsl={stringToHSL(color)}
                pointer={() => <div className={classes.hueSliderMarker} />}
                direction={"horizontal"}
                onChange={(value) => onChange(colorToHex((value as unknown) as tinycolor.ColorInputWithoutInstance))}
            />
        </div>
    </>
);

export default Picker;
