import { Helmet } from "react-helmet-async";

export default function HeadMetadata({ title }) {
    return (
        <Helmet>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width,
initial-scale=1.0"
            />
            <title>{title}</title>
            <script
                src="https://kit.fontawesome.com/9304a5213a.js"
                crossorigin="anonymous"
            ></script>
        </Helmet>
    );
}
