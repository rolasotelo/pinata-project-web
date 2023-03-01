import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Image from 'next/image'
import avatarImage from '@/images/avatar.jpg'
import Link from "next/link";

const navigation = [
    {name: 'Me 👋🏾', href: '/stages/1'},
    {name: '¿ 🇲🇽 ?', href: '/stages/2'},
    {name: 'History ⚔️', href: '/stages/3'},
    {name: 'Culture 🎭', href: '/stages/4'},
    {name: 'Food 🌮', href: '/stages/5'},
    {name: 'Oaxaca 🌴', href: '/stages/6'},
    {name: '🧟‍♂️ vs 🤖', href: '/stages/7'},

]

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" >
                        <Image
                            src={avatarImage}
                            alt="Rolando's avatar"
                            sizes={'2.25rem'}
                            className={
                                'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9'
                            }
                            priority
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6">
                            {item.name}
                        </a>

                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6">
                        Your images 👩🏼‍🎨 <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Image
                            src={avatarImage}
                            alt=""
                            sizes={'2.25rem'}
                            className={
                                'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9'
                            }
                            priority
                        />
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
