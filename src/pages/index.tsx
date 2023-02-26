const products = [
    {
        id: 1,
        name: 'Llamas and pinatas',
        href: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ymfjDY6yJN1DmvNeoUmMdcOH/user-bu0g53S9wFvMnD4a3DQnES6e/img-0ca1CfaJ3FUwvOII5e3FXxGf.png?st=2023-02-26T21%3A21%3A41Z&se=2023-02-26T23%3A21%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-26T11%3A08%3A53Z&ske=2023-02-27T11%3A08%3A53Z&sks=b&skv=2021-08-06&sig=LHTekv2yZ/s7ifgHIJLHvw5bHbPhgDNwhOXNAheXWww%3D',
        imageSrc: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ymfjDY6yJN1DmvNeoUmMdcOH/user-bu0g53S9wFvMnD4a3DQnES6e/img-0ca1CfaJ3FUwvOII5e3FXxGf.png?st=2023-02-26T21%3A21%3A41Z&se=2023-02-26T23%3A21%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-26T11%3A08%3A53Z&ske=2023-02-27T11%3A08%3A53Z&sks=b&skv=2021-08-06&sig=LHTekv2yZ/s7ifgHIJLHvw5bHbPhgDNwhOXNAheXWww%3D',
        imageAlt: "Llamas and pinatas",
    },
    // More products...
]

export default function Home() {
  return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">What First comes to mind when you think about Mexico</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href} target="_blank">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>

                    </div>

                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  )
}
