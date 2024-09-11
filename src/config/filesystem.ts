import { registerAs } from '@nestjs/config'

export default registerAs("filesystem", () => ({
    defualt: 'docs',
    disks: {
        products: {
            driver: 'local',
            basePath: 'D:\\Users\\osaaa\\work\\comactes\\comactes-rest-api\\src\\assets\\images',
            baseUrl: 'http://localhost:3000/'
        },
        files: {
            driver: 'local',
            basePath: 'D:\\Users\\osaaa\\work\\comactes\\comactes-rest-api\\src\\assets\\files',
            baseUrl: 'http://localhost:3000/'
        }
    },
}));