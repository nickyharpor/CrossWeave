export async function handle(state, action) {
    const puzzles = state.puzzles
    const balances = state.balances
    const input = action.input
    const caller = action.caller

    if (input.function === 'transfer') {
        const target = input.target
        const qty = input.qty

        if (!Number.isInteger(qty)) {
            throw new ContractError('"qty" must be an integer')
        }

        if (!target) {
            throw new ContractError('No target specified')
        }

        if (qty <= 0 || caller === target) {
            throw new ContractError('Invalid token transfer')
        }

        if (balances[caller] < qty) {
            throw new ContractError(`Caller balance not high enough to send ${qty} token(s)`)
        }

        balances[caller] -= qty
        if (target in balances) {
            balances[target] += qty
        } else {
            balances[target] = qty
        }

        return { state }
    }

    if (input.function === 'balance') {
        const target = input.target
        const ticker = state.ticker

        if (typeof target !== 'string') {
            throw new ContractError('Must specificy correct target to get balance for')
        }

        if (typeof balances[target] !== 'number') {
            throw new ContractError('Cannnot get balance, target does not exist')
        }

        return { result: { target, ticker, balance: balances[target] } }
    }

    if (input.function === 'read'){
        return { state }
    }

    if (input.function === 'create') {
        const solution_hash = input.solution_hash
        const file_id = input.file_id
        const prize = input.prize

        if (typeof solution_hash !== 'string') {
            throw new ContractError('A string "solution_hash" must be provided')
        }

        if (typeof file_id !== 'string') {
            throw new ContractError('A string "file_id" must be provided')
        }

        if (!Number.isInteger(prize)) {
            throw new ContractError('Prize must be an integer')
        }

        if (prize < 0){
            throw new ContractError('Prize cannot be negative')
        }

        if (balances[caller] < prize) {
            throw new ContractError(`Caller balance not high enough to cover the prize`)
        }

        if (solution_hash in puzzles) {
            throw new ContractError('Puzzle already exists')
        } else {
            balances[caller] -= prize
            puzzles[solution_hash] = {
                "file_id": file_id,
                "creator": caller,
                "prize": prize,
                "winner": null
            }
        }

        return { state }
    }

    if (input.function === 'solve') {
        const solution = input.solution
        const solution_hash = input.solution_hash

        if (typeof solution_hash !== 'string') {
            throw new ContractError('A string "solution_hash" must be provided')
        }

        if (typeof solution !== 'string') {
            throw new ContractError('A string "solution" must be provided')
        }

        if (solution_hash in puzzles) {
            let solution_buffer = SmartWeave.arweave.utils.stringToBuffer(solution);
            let this_hash = await SmartWeave.arweave.utils.crypto.hash(solution_buffer);
            const calculated_hash = SmartWeave.arweave.utils.bufferTob64Url(this_hash);
            if (calculated_hash === solution_hash){
                if (puzzles[solution_hash].winner === null) {
                    puzzles[solution_hash].winner = caller;
                    if (puzzles[solution_hash].prize > 0){
                        if (caller in balances) {
                            balances[caller] += puzzles[solution_hash].prize
                        } else {
                            balances[caller] = puzzles[solution_hash].prize
                        }
                    }
                } else {
                    throw new ContractError('Puzzle has already been solved')
                }
            } else {
                throw new ContractError('Wrong solution')
            }
        } else {
            throw new ContractError('Puzzle not found')
        }

        return { state }
    }

    throw new ContractError(`No function supplied or function not recognised: "${input.function}"`)
}
