import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'

export default function Quantity(props) {

    const { quantity, setQuantity } = props;

    return (
        <DropDownPicker
            items={[
                {
                    label: '1',
                    value: 1
                },
                {
                    label: '2',
                    value: 2
                },
                {
                    label: '3',
                    value: 3
                }
            ]}
            defaultValue={quantity}
            containerStyle={styles.containerStyle}
            itemStyle={styles.itemStyle}
            dropDownStyle={styles.dropDownPicker}
            style={styles.dropDownPicker}
            labelStyle={styles.labelStyle}
            onChangeItem={(item) => setQuantity(item.value)}
        />
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        height: 40,
        width: 100
    },
    itemStyle: {
        justifyContent: 'flex-start'
    },
    dropDownPicker: {
        backgroundColor: '#fafafa',
        zIndex: 2
    },
    labelStyle: {
        color: '#000'
    }
});
