export const getDomain = () => {
    return new URL(
        process.env.NODE_ENV === 'production'
          ? 'https://discover-coffee-stores-latest.vercer.app'
          : 'http://localhost:3000'
    );
};

