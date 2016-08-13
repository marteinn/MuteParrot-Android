const WRITE_SETTING = 'WRITE_SETTING';

const writeSetting = (id, value) => {
    return {
        type: WRITE_SETTING,
        id,
        value
    };
}

export {
    WRITE_SETTING,
    writeSetting,
}
