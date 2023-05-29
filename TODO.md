- Host
- Add pipeline to publish

- Automated test
    - Abstract the WhatsApp Web JS library: Create a wrapper or abstraction around the WhatsApp Web JS library that you are using in your commands. This abstraction will allow you to mock or stub the necessary methods and behaviors during testing, making it easier to simulate and control different scenarios. You can create a separate module or class that acts as a facade to interact with the library, and then have your commands depend on this abstraction instead of directly using the library.
    - Mock the translation module: Create a mock or stub implementation of the translation module that provides the necessary translations for your commands. This allows you to easily control the translations used in your tests and ensure consistent behavior.
    - Use dependency injection: Modify your commands to use dependency injection for their dependencies. Instead of instantiating dependencies internally, pass them as constructor parameters or inject them through setters or methods. This makes it easier to provide mock or stub implementations of these dependencies during testing.