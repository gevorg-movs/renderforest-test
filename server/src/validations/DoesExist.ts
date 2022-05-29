import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator'
import { Model } from 'sequelize'

const DoesExist = (
    property: { model: typeof Model; field: string },
    validationOptions?: ValidationOptions,
) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'DoesExist',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                async validate(value: string | number) {
                    // @ts-ignore
                    const result = await property.model.findOne({
                        where: {
                            [property.field]: value,
                        },
                    })
                    return !!result
                },

                defaultMessage() {
                    return `${property.model.name} does not exist`
                },
            },
        })
    }
}

export default DoesExist
