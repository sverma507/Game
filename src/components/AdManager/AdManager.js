import React from 'react'

const AdManager = () => {
    return (
        <>
            <div className='mx-28 my-6'>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add New </button>
            </div>
            <div>
                <form>
                    <div className='flex my-6 mx-28 rounded p-4 border border-slate-400 items-end'>
                        <div>
                            <div className='mr-6'>
                                <label for="ad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ad</label>
                                <input type="text" id="ad" class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ad 1" required />
                            </div>
                        </div>
                        <div className='mr-6'>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="name" class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>

                        <div className='mr-6'>
                            <label for="ph_no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No.</label>
                            <input type="Number" id="ph_no" class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0000....." required />
                        </div>

                        <div className='mr-6'>
                            <label for="payment_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Number</label>
                            <input type="number" id="payment_number" class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0..." required />
                        </div>

                        <button type="submit" class="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>

                </form>
            </div>
            <div>
                <form>
                    <div className='flex my-6 mx-28 rounded p-4 border border-slate-400 items-end'>
                        <div>
                            <div className='mr-6'>
                                <label for="ad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ad</label>
                                <input type="text" id="ad" class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ad 1" required />
                            </div>
                        </div>
                        <div className='mr-6'>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="name" class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>

                        <div className='mr-6'>
                            <label for="ph_no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No.</label>
                            <input type="Number" id="ph_no" class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0000....." required />
                        </div>

                        <div className='mr-6'>
                            <label for="payment_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Number</label>
                            <input type="number" id="payment_number" class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0..." required />
                        </div>

                        <button type="submit" class="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default AdManager
