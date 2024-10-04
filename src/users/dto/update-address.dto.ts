import { PartialType } from "@nestjs/mapped-types";
import { createAddressDto } from "./create-address.dto";

export class UpdateAdderssDto extends PartialType(createAddressDto) {}