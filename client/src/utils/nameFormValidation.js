const yup = require('yup');

const scheme = yup.object().shape({
    tag: yup.string(),
    naming_type: yup
        .string()
        .test(
            'NameType', 'Nametype should not be empty!',
            function(value) {
                const { tag } = this.parent;
                if(tag === "Name"){
                    if(!value.length > 0){
                        return false;
                    }
                }
                return true;
            }
        ),
    contestName: yup.string('Title should be a string!')
        .required('Empty title field!'),
    industry: yup.string('Industry should be a string!')
        .required('Empty industry field!'),
    venture: yup.string('Venture should be a string!')
        .required('Empty venture field!'),
    target: yup.string('Target should be a string!')
        .required('Empty target field!'),
    preference: yup.string('Preference should be a string!')
        .required('Empty preference field!'),
    venture_name: yup.string('Venture name should be a string!')
});

export default scheme;
