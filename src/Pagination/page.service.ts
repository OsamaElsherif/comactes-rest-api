import { GenericFilter } from "src/interfaces/GenericFilter.interface";
import { FindOptionsWhere, Repository } from "typeorm";

export class PageService {
    protected paginate<T>(
        repository: Repository<T>,
        filter: GenericFilter,
        where?:  FindOptionsWhere<T>
    ) {
        return repository.findAndCount({
            skip: (filter.page - 1) * (Number.parseInt(String(filter.pageSize))),
            take: filter.pageSize,
            where: where
        });
    }
}