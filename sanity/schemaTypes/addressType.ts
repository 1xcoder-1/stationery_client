import { PinIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType({
    name: "address",
    title: "Address",
    type: "document",
    icon: PinIcon,
    fields: [
        defineField({
            name: "firstName",
            title: "First Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "lastName",
            title: "Last Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "phone",
            title: "Phone",
            type: "string",
        }),
        defineField({
            name: "address",
            title: "Address",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "city",
            title: "City",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "state",
            title: "State",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "zip",
            title: "Zip Code",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "clerkUserId",
            title: "Clerk User ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "default",
            title: "Default Address",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            firstName: "firstName",
            lastName: "lastName",
            address: "address",
            city: "city",
            state: "state",
        },
        prepare(select) {
            return {
                title: `${select.firstName} ${select.lastName}`,
                subtitle: `${select.address}, ${select.city}, ${select.state}`,
                media: PinIcon,
            };
        },
    },
});
