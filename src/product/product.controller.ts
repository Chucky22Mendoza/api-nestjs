import { CreateProductDTO } from './dto/product.dto';
import { Controller, Body, Get, Post, Put, Delete, Res, HttpStatus, Param, NotFoundException } from '@nestjs/common';

import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json(product);
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(products);
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        try {
            const product = await this.productService.getProduct(productID);
            if(!product) throw new NotFoundException('Product does not exists');
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    @Delete('/:productID')
    async deleteProduct(@Res() res, @Param('productID') productID) {
        try {
            const product = await this.productService.deleteProduct(productID);
            if(!product) throw new NotFoundException('Product does not exists');
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    @Put('/:productID')
    async updateProduct(@Res() res, @Param('productID') productID, @Body() createProductDTO: CreateProductDTO) {
        try {
            const product = await this.productService.updateProduct(productID, createProductDTO);
            if(!product) throw new NotFoundException('Product does not exists');
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
